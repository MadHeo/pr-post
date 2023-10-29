import {
  Box,
  Button,
  Stack,
  TextField,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import Link from "next/link";
import { collection, addDoc, getFirestore } from "firebase/firestore/lite";
import { firebaseApp } from "../../lib/firbase";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../../public/img/logo_4.png";

export default function VisitorRegister() {
  const router = useRouter();
  const [contents, setContents] = useState();
  const [name, setName] = useState();

  const [values, setValues] = useState({
    name: "",
    content: "",
  });

  const onClickSubmit = (): void => {
    const post = collection(getFirestore(firebaseApp), "post");

    void addDoc(post, {
      name: name,
      store: "마이오운가든",
      create_at: format(new Date(), "yyy-MM-dd HH:mm:ss"),
      content: contents,
      yn: "y",
    });

    router.push("/myowngarden");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onChangeName = (e: any) => {
    setName(e.currentTarget.value);
  };

  const onChangeContent = (e: any) => {
    setContents(e.currentTarget.value);
  };

  return (
    <>
      <Stack
        sx={{
          p: "3rem 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ marginBottom: "24px" }}>
          <Typography fontSize={"1.3rem"} color={"gray"}>
            방명록을 작성해 보세요
          </Typography>
        </Box>
        <Box>
          {/* <form onSubmit={onClickSubmit}> */}
          <Box marginBottom={"24px"}>
            <InputLabel htmlFor="name">닉네임</InputLabel>
            <Input
              type="text"
              id="name"
              name="name"
              onChange={onChangeName}
              sx={{ width: "100%" }}
              inputProps={{ maxLength: 10 }}
            />
          </Box>
          <Box marginBottom={"24px"}>
            <InputLabel htmlFor="content">글 쓰기</InputLabel>
            <TextField
              id="content"
              name="content"
              onChange={onChangeContent}
              rows={10}
              multiline
              inputProps={{ maxLength: 300 }}
              placeholder="비하·비방·욕설이 담긴 게시물은 삭제될 수 있습니다. 언젠간 추억이 될 당신의 흔적을 남겨보세요. 최대 300자까지 입력할 수 있습니다."
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ width: "100%" }}
              type="submit"
              variant="contained"
              size="large"
              color="info"
              onClick={onClickSubmit}
            >
              등록하기
            </Button>
          </Box>
          {/* </form> */}
          <Link href={"/myowngarden"}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                marginTop: "12px",
                width: "100%",
              }}
            >
              방명록 보러가기
            </Button>
          </Link>
        </Box>
      </Stack>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image src={logo} alt=""></Image>
      </Box>
    </>
  );
}
