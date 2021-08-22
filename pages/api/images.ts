// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import formidable from 'formidable'
import nextConnect from 'next-connect'
import cloudinaryLib from 'cloudinary'
import firebase from 'firebase'
import 'firebase/firestore'

interface FormBodyPayload {
  title: string
  fileName: string
  file: formidable.File
}

const cloudinaryConfig: cloudinaryLib.ConfigOptions = {
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
}

function getSingleArrayItem<T>(payload: T|T[]) {
  return Array.isArray(payload) ? payload[0] : payload
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)

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

  const cloudinaryUpload = async (path: string) => {
    const cloudinary = cloudinaryLib.v2
    cloudinary.config(cloudinaryConfig)
    return await cloudinary.uploader.upload(path)
  }

  try {
    const data = await parseFormData()
    const uploadResponse = await cloudinaryUpload(data.file.path)
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

    return res
      .status(200)
      .json({
        message: 'success',
        data: {
          id: firestoreResponse.id,
          ...firestorePayload
        }
      })
  } catch (err) {
    console.log(err)
    res.status(400).json({message: 'failed'})
  }
})
connect.get(async (req, res) => {
  try {
    const firebaseResponse = await firebase
      .firestore()
      .collection('images')
      .orderBy('createdAt', 'desc')
      .get()
      .then((res) => {
        return res.docs.map((doc) => {
          return {
            ...doc.data(),
            createdAt: doc.data().createdAt.seconds * 1000,
            id: doc.id
          }
        })
      })

    return res.status(200).json({
      message: "success",
      data: firebaseResponse
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
