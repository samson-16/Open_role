import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
    const session = await getServerSession()
    if (!session) {
      
       redirect("/api/auth/signin")
    }
    return <div>Protected content</div>;
}
