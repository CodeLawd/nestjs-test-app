// import { Injectable, Global } from '@nestjs/common';
// import { S3 } from 'aws-sdk';

// @Injectable()
// export class FileService {

//   async uploadPublicFile(dataBuffer: Buffer, filename: string) {
//     try {
//       const s3 = new S3();
//       const uploadResult = await s3
//         .upload({
//           Bucket: process.env.AWS_BUCKET_NAME,
//           Body: dataBuffer,
//           Key: `1234-${filename}`,
//           ACL: 'public-read',
//         })
//         .promise();

//       return {
//         key: uploadResult.Key,
//         url: uploadResult.Location,
//       };
//     } catch (err) {
//       console.log(err);
//       return { key: 'error', url: err.message };
//     }
//   }
// }
