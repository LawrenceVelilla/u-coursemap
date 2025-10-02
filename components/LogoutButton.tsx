"use client"
import { Button } from "@/components/ui/button"
import { shadow } from "@/styles/utils"
import { logoutUser } from "@/actions/users"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"


function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    
    const { error } = await logoutUser();

    if (!error) {
      router.push('/');
    }
    else {
      alert(`Error: ${error}`);
    }

    setLoading(false);
  };

  return (
    <Button
      variant="default"
      onClick={handleLogout}
      disabled={loading}
      className={cn({ shadow }, "border border-primary bg-none hover:bg-secondary hover:text-primary hover:border-secondary w-32")}
    >
      {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Logout'}
    </Button>
  );
}

export default LogoutButton;