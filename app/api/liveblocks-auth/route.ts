import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_0AsDPBwzisn10_uR8o9mwWjzt8z5aizrTF8E-i3WMJ19SZDtrCzEx7Momu-ZL7Sl",
});

export async function POST(request: Request) {
  const { room } = await request.json();
  const userInfo = {
    name: "test",
    picture: "",
  };

  const session = liveblocks.prepareSession(
    "test@test.com",
    { userInfo }, // Optional
  );

  //   if (room) {
  //     session.allow(room, session.FULL_ACCESS);
  //   }

  // Authorize the user and return the result
  //   const { status, body } = await session.authorize();
  return new Response();
}
