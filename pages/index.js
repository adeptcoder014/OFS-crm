import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
//====================================
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Token");
      if (!token) {
        router.push("/admin/login");
      }else{
        router.push("/admin/home")
      }
    }
  }, [  ]);

  //================================
  return (
    <>
      <h1>Welcome to the OFS CRM system</h1>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            backgroundImage: "linear-gradient(45deg, #ffa386, #d5552c)",
            color: "white",
            fontSize: 18,
            // width: "15%",
            textAlign: "center",
            p: 1,
            borderRadius: 1,
            cursor: "pointer",
            mr: 5,
            ml: 5,
          }}
          onClick={() => router.push("/user/login")}
        >
          User LOGIN
        </Box>
        <Box
          sx={{
            backgroundImage: "linear-gradient(45deg, #ffa386, #d5552c)",
            color: "white",
            fontSize: 18,
            // width: "15%",
            textAlign: "center",
            p: 1,
            borderRadius: 1,
            cursor: "pointer",
          }}
          onClick={() => router.push("/admin/login")}
        >
          Admin LOGIN
        </Box>
      </Box>
    </>
  );
}
