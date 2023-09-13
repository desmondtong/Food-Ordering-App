// const dotenv = require("dotenv");

// dotenv.config(); //to bring in env variables for s3 client
import { Request, Response } from "express";
import pool from "../db/db";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp"; //for image resizing
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; //AWS s3 client

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

//set up new s3 object
const s3: S3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});
// const s3: S3Client = new S3Client({ region: bucketRegion });

//upload new item image to s3 and update item image URL in postgres db
const uploadItemImage = async (req: Request, res: Response) => {
  try {
    // const user_id = req.body?.user_id;

    //resize image
    const buffer = await sharp(req.file?.buffer).resize(500, 500).toBuffer();

    //send image to s3
    const params = {
      Bucket: bucketName,
      Key: `${uuidv4()}.jpg`, //create unique file name to prevent overrides due to same name
      Body: buffer,
      ContentType: req.file?.mimetype,
      ACL: "public-read", // Make the object publicly accessible
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    //store s3 URL in postgres DB:
    //retrieve user and update image_url field with the S3 URL
    try {
      const image_url: String = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${params.Key}`;

      const uploadImage = await pool.query(
        "UPDATE items SET image_url = $1 WHERE uuid = $2 RETURNING *",
        [image_url, req.params.item_id]
      );

      res.send({
        status: "User image uploaded successfully",
        imageUrl: uploadImage.rows,
      });
    } catch (error: any) {
      console.log(error.message);
      res.json({ status: "error", msg: "Upload item image failed" });
    }
  } catch (error) {
    console.error("Error uploading and updating user:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

//upload new image to s3 and update listing image URL in mongodb
// const uploadListingImage = async (req, res) => {
//   try {
//     //resize image
//     const buffer = await sharp(req.file.buffer)
//       .resize(400, 400, {
//         fit: "contain",
//       })
//       .toBuffer();

//     //send image to s3
//     const params = {
//       Bucket: bucketName,
//       Key: `image-${Date.now()}.jpeg`, //create unique file name to prevent overrides due to same name
//       Body: buffer,
//       ContentType: req.file.mimetype,
//       ACL: "public-read", // Make the object publicly accessible
//     };
//     const command = new PutObjectCommand(params);
//     await s3.send(command);
//     console.log("Listing image uploaded successfully");

//     //store s3 URL in mongodb database:
//     //retrieve user and update image_url field with the S3 URL
//     const image_url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${params.Key}`;

//     if ("listing_id" in req.body) {
//       const listing_id = req.body.listing_id;
//       const listing = await ListingModel.findById(listing_id);
//       listing.image_url = image_url;
//       await listing.save();
//       console.log("Listing image stored in db");
//     }

//     res.send({
//       message: "Listing image uploaded successfully",
//       url: image_url,
//     });
//   } catch (error) {
//     console.error("Error uploading and updating listing:", error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// };

export { uploadItemImage };
