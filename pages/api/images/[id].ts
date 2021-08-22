import nextConnect from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import firebase from "@server/services/Firebase";
import cloudinary from "@server/services/Cloudinary";
import {getSingleArrayItem} from "@utils/array";

const connect = nextConnect<NextApiRequest, NextApiResponse>()
connect.delete(async (req, res) => {
  const query = getSingleArrayItem(req.query.id)
  try {
    const resultSnapshot = await firebase
      .firestore()
      .collection("images")
      .doc(query)
    const resultFirebase = (await resultSnapshot.get()).data()

    if (!resultFirebase) {
      return res.status(404).json({message: 'Data not found'})
    }

    await cloudinary.remove(resultFirebase.publicId as string)
    await resultSnapshot.delete()
    return res.status(200).json({})
  } catch(err) {
    console.log(err)
    return res.status(400).json({})
  }
})

export default connect