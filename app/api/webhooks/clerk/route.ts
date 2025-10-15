import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;
    const { id } = evt.data;

    // Initialize username and image_url
    let username: string | undefined = undefined;
    let image_url: string | undefined = undefined;

    if ('attributes' in evt.data) {
    const dataWithAttrs = evt.data as { attributes: { username?: string; image_url?: string } };
     username = dataWithAttrs.attributes.username;
    image_url = dataWithAttrs.attributes.image_url;
    }

    if (eventType === 'user.created') {
      await db.user.create({
        data: {
          externalUserId: id!,
          username: username ?? '',
          imageUrl: image_url ?? ''
        }
      });

      return new Response('User Created Successfully', { status: 200 });
    }

    if (eventType === 'user.updated') {
      const currentUser = await db.user.findUnique({
        where: {
          externalUserId: id
        }
      });

      if (!currentUser) {
        return new Response('User not found', { status: 404 });
      }

      await db.user.update({
        where: {
          externalUserId: id
        },
        data: {
          username: username ?? currentUser.username,
          imageUrl: image_url ?? currentUser.imageUrl
        }
      });

      return new Response('User Updated Successfully', { status: 200 });
    }

    if (eventType === 'user.deleted') {
      await db.user.delete({
        where: {
          externalUserId: id
        }
      });
      return new Response('User Deleted Successfully', { status: 200 });
    }

    return new Response('Event type not handled', { status: 400 });
  } catch (err) {
    return new Response(JSON.stringify({
      message: "Error processing webhook",
      error:err
    }), { status: 500 });
  }
}

