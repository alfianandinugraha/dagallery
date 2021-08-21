// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import formidable from 'formidable'
import nextConnect from 'next-connect'
import cloudinaryLib from 'cloudinary'

const cloudinaryConfig: cloudinaryLib.ConfigOptions = {
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
}

function getSingleArrayItem<T>(payload: T|T[]) {
  return Array.isArray(payload) ? payload[0] : payload
}

const connect = nextConnect<NextApiRequest, NextApiResponse>()
connect.post(async (req, res) => {
  const requestUpload: any = () => {
    return new Promise((resolve, reject) => {
      const form = formidable();
      const cloudinary = cloudinaryLib.v2
      cloudinary.config(cloudinaryConfig)

      form.parse(req, (err: any, fields: formidable.Fields, files: formidable.Files) => {
        if (err) {
          return reject(err)
        }

        const body = {
          fileName: getSingleArrayItem(fields.fileName),
          title: getSingleArrayItem(fields.title),
          file: getSingleArrayItem(files.file),
        }

        cloudinary.uploader.upload(
          body.file.path,
          (err, res) => {
            if (err) {
              return reject(err)
            }
            resolve({err, fields, files})
          }
        )
      })
    })
  }

  try {
    const data = await requestUpload()
    res.status(200).json({message: 'success'})
  } catch (err) {
    console.log(err)
    res.status(400).json({message: 'failed'})
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default connect
