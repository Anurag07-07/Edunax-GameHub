import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id,username,image_url } = evt.data
    const eventType = evt.type
    if (eventType === 'user.created') {
      await db.user.create({
        data:{
          externalUserId:id!,
          username:username,
          imageUrl:image_url

        }
      })

      return new Response('User Created Succesfully',{status:200})
    }

    if (eventType === 'user.updated') {
      const currentUser = await db.user.findUnique({
        where:{
          externalUserId:id
        }
      })

      if (!currentUser) {
        return new Response("User not found",{status:404})
      }

      await db.user.update({
        where:{
          externalUserId:id
        },
        data:{
          username:username,
          imageUrl:image_url          
        }
      })
      return new Response('User Updated Succesfully',{status:200})
    }

    if (eventType=='user.deleted') {
      await db.user.delete({
        where:{
          externalUserId:id
        }
      })
      return new Response('User Deleted Succesfully',{status:200})
    }
  } catch (err) {
    return Response.json({
      message:"User Not Created",
      error:err
    })
  }
}