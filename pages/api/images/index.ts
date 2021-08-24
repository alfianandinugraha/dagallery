// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import formidable from 'formidable'
import nextConnect from 'next-connect'
import {getSingleArrayItem} from "@utils/array";
import cloudinary from "@server/services/Cloudinary";
import firebase from "@server/services/Firebase";
import {ImageFirebase} from "api";
import {Image} from "state";

interface FormBodyPayload {
  title: string
  fileName: string
  file: formidable.File
}

const connect = nextConnect<NextApiRequest, NextApiResponse>()
connect.post(async (req, res) => {
  const parseFormData = (): Promise<FormBodyPayload> => {
    return new Promise((resolve, reject) => {
      const form = formidable();

      form.parse(req, (err: any, fields: formidable.Fields, files: formidable.Files) => {
        if (err) return reject(err)

        const body: FormBodyPayload = {
          fileName: getSingleArrayItem(fields.fileName),
          title: getSingleArrayItem(fields.title),
          file: getSingleArrayItem(files.file),
        }

        resolve(body)
      })
    })
  }

  try {
    const data = await parseFormData()
    const uploadResponse = await cloudinary.upload(data.file.path)
    const firestorePayload = {
      title: data.title,
      fileName: data.fileName,
      publicId: uploadResponse.public_id,
      version: uploadResponse.version,
      format: uploadResponse.format,
      createdAt: new Date()
    }
    const firestoreResponse = await firebase
      .firestore()
      .collection('images')
      .add(firestorePayload)
    const response: Image = {
      ...firestorePayload,
      id: firestoreResponse.id,
      createdAt: firestorePayload.createdAt.getTime(),
      url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v${firestorePayload.version}/${firestorePayload.publicId}.${firestorePayload.format}`
    }

    return res
      .status(200)
      .json({
        message: 'success',
        data: response
      })
  } catch (err) {
    console.log(err)
    res.status(400).json({message: 'failed'})
  }
})
connect.get(async (req, res) => {
  const searchKeyword = getSingleArrayItem(req.query.q)

  try {
    let response: Image[] = []
    response = await firebase
      .firestore()
      .collection('images')
      .orderBy('createdAt', 'desc')
      .get()
      .then((res) => {
        return res.docs.map((doc) => {
          const data: ImageFirebase = doc.data() as ImageFirebase
          const newItem: Image = {
            ...data,
            createdAt: doc.data().createdAt.seconds * 1000,
            id: doc.id,
            url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v${data.version}/${data.publicId}.${data.format}`
          }
          return newItem
        })
      })

    if (searchKeyword) {
      response = response.filter((item) => {
        return item.title.includes(searchKeyword)
      })
    }

    return res.status(200).json({
      message: "success",
      data: response
    })
  } catch(err) {
    return res.status(200).json({
      message: "failed",
      data: undefined
    })
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default connect
