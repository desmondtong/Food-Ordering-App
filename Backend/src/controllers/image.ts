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
    accessKeyId: accessKey || "",
    secretAccessKey: secretAccessKey || "",
  },
  region: bucketRegion || "",
});

//upload new item image to s3 and update item image URL in postgres db
const uploadItemImage = async (req: Request, res: Response) => {
  try {
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
    //update image_url to respective item based on item_id
    try {
      const image_url: String = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${params.Key}`;

      const uploadImage = await pool.query(
        "UPDATE items SET image_url = $1 WHERE uuid = $2 RETURNING *",
        [image_url, req.params.item_id]
      );

      res.send({
        status: "User image uploaded successfully",
        imageUrl: uploadImage.rows[0].image_url,
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

//upload new item image to s3 and update item image URL in postgres db
const displayImage = async (req: Request, res: Response) => {
  try {
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

    const image_url: String = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${params.Key}`;

    res.send({
      status: "User image uploaded successfully",
      imageUrl: image_url,
    });
  } catch (error) {
    console.error("Error uploading and updating user:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { uploadItemImage, displayImage };
