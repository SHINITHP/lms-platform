import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string; attachmentId: string } }
){
    try {
        const { userId } = auth();

        if(!userId) return new NextResponse("Unauthorized", { status: 401 });

        const courseOwner = await db.course.findUnique({
            where :{
                id: params.courseId,
                userId: userId,
            }
        })

        if(!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId,
            }
        })

        return NextResponse.json(attachment, { status: 200 });
    } catch (error) {
        console.log("Attachments_id", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}