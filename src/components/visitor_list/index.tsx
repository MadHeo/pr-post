import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore/lite";
import { firebaseApp } from "../../lib/firbase";
import { MasonryGrid } from "@egjs/react-grid";
import AddIcon from "@mui/icons-material/Add";
import { format } from "date-fns";
import Image from "next/image";
import logo from "../../../public/img/logo_4.png";
import { filterBadWords } from "../../lib/filterBadWords";

declare interface IPost {
  content: string;
  create_at: string;
  name: string;
  store: string;
  yn: string;
}

export default function VisitorList() {
  const [postData, setPostData] = useState<any>();

  const filter = filterBadWords;
  const getPost = async () => {
    const post = collection(getFirestore(firebaseApp), "post");
    const result = await getDocs(query(post, orderBy("create_at", "desc")));
    const datas = result.docs.map((el) => el.data());
    setPostData(datas);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Box
        sx={{
          padding: "44px 0px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            width: "3.5rem",
            height: "3.5rem",
            position: "absolute",
            bottom: "10%",
            right: "10%",
            borderRadius: "100px",
            zIndex: 999,
          }}
        >
          <Link href={"/myowngarden/register"}>
            <IconButton
              sx={{
                backgroundColor: "#fa783c",
                width: "100%",
                height: "100%",
              }}
            >
              <AddIcon
                sx={{ color: "white", width: "90%", height: "90%" }}
              ></AddIcon>
            </IconButton>
          </Link>
        </Box>
        <Box sx={{ marginBottom: "24px" }}>
          <Typography fontSize={"1.7rem"} color={"#484848"}>
            my own garden
          </Typography>
        </Box>
        <Box sx={{ height: "100%" }}>
          <MasonryGrid
            className="container"
            gap={16}
            defaultDirection={"end"}
            align={"center"}
            column={2}
            columnSize={0}
            columnSizeRatio={0}
          >
            {postData?.map((el: any, i: number) => (
              <Card
                sx={{
                  backgroundColor: "#fffbca",
                  width: "44vw",
                }}
                key={i}
                className={"item"}
              >
                <CardContent>
                  <Typography
                    fontSize={"1rem"}
                    variant="body1"
                    color="#3b3b3b"
                    marginBottom={"16px"}
                    sx={{ wordBreak: "break-all" }}
                  >
                    {filter(el.content)}
                  </Typography>
                  <Typography
                    fontWeight={500}
                    variant="body2"
                    color="text.secondary"
                  >
                    {el.name.charAt(0) === "@" ? (
                      <a
                        href={`https://www.instagram.com/${
                          el.name.split("@")[1]
                        }`}
                        id="insta_click"
                      >
                        {filter(el.name)}
                      </a>
                    ) : (
                      filter(el.name)
                    )}
                  </Typography>
                  <Typography fontSize={"0.8rem"} variant="body2" color="gray">
                    {el.create_at.split(" ")[0]}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </MasonryGrid>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "rgba(251, 251, 251, 0)",
        }}
      >
        <Image src={logo} alt=""></Image>
      </Box>
    </>
  );
}
