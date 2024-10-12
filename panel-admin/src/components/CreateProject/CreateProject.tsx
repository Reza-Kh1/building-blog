import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { MdClose, MdDataSaverOn } from "react-icons/md";
import { fetchWorkerName } from "../../services/worker";
import { useQuery } from "@tanstack/react-query";
import SelectMedia from "../SelectMedia/SelectMedia";
import { useState } from "react";
import { DataMediaType } from "../../type";
import ImageComponent from "../ImageComponent/ImageComponent";
import { FaPenToSquare } from "react-icons/fa6";
import { fetchTags } from "../../services/tag";

export default function CreateProject() {
  const { register, setValue, handleSubmit, watch } = useForm<any>({
    defaultValues: {
      workerId: 0,
      status: false,
    },
  });
  const { data: workerName, isPending: workerPending } = useQuery({
    queryKey: ["workerName"],
    queryFn: fetchWorkerName,
  });
  const { data: tagsName, isPending: tagsPending } = useQuery({
    queryKey: ["tagsName"],
    queryFn: fetchTags,
  });
  const [videoProject, setVideoProject] = useState<DataMediaType | null>(null)
  const [image, setImage] = useState<DataMediaType | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [editImg, setEditImg] = useState<DataMediaType | null>(null);
  const [tagsProject, setTagsProject] = useState<{ title: string, id: number }[]>([])
  const [galleryProject, setGalleryProject] = useState<DataMediaType[] | []>(
    []
  );

  const submitHandler = (form) => {
    const body = {
      image: image?.url,
      gallery: galleryProject,
      video: videoProject,
      alt: image?.alt,
      ...form,
      tags: tagsProject
    }
    console.log(body);
  };
  const nameWorker = watch("workerId");
  const statusProject = watch("status");
  return (
    <>
      <h1 className="bg-blue-500 shadow-md p-2 rounded-md mb-5 text-gray-50">ایجاد پروژه</h1>
      <form
        name="off"
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex gap-3 items-center">
          <TextField
            fullWidth
            autoComplete="off"
            autoSave="off"
            className="shadow-md"
            label={"نام"}
            {...register("name", { required: true })}
          />
          <FormControl fullWidth className="shadow-md">
            <InputLabel id="demo-simple-select-label">نام متخصص</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="نام متخصص"
              value={nameWorker}
              onChange={(e) => setValue("workerId", e.target.value)}
            >
              <MenuItem value={0}>انتخاب کنید</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="grid grid-cols-2 gap-3 items-start">
          <TextField
            multiline
            rows={6}
            autoComplete="off"
            fullWidth
            className="shadow-md"
            label={"توضیحات"}
            {...register("description", { required: true })}
          />
          <div className="flex">
            <div className="flex flex-col items-start w-1/2 gap-3">
              <span>تصویر پروژه</span>
              <SelectMedia
                addMedia={(alt, image) => setImage({ alt, url: image.url })}
              />
            </div>
            <div className="w-1/2">
              <ImageComponent
                deleteHandler={() => setImage(null)}
                img={image}
              />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <TextField
            multiline
            rows={6}
            autoComplete="off"
            autoSave="off"
            className="shadow-md w-1/2"

            label={"آدرس"}
            {...register("address", { required: true })}
          />
          <Autocomplete
            multiple
            className="shadow-md w-1/2"
            id="tags-outlined"
            options={[
              { title: "red", id: 11 },
              { title: "blue", id: 12 },
              { title: "yellow", id: 13 },
              { title: "green", id: 14 },
            ]}
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={tagsProject}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="تگ های پروژه"
              />
            )}
            onChange={(_, newValue) => setTagsProject(newValue)}
          />
        </div>
        <div className="flex gap-3 ">
          <div className="flex flex-col w-1/3 gap-3">
            <div className="flex flex-col gap-3">
              <span>ویدئو پروژه</span>
              <SelectMedia
                addMedia={(alt, image) => setVideoProject({ alt, url: image.url })}
              />
            </div>
            <div className="">
              <ImageComponent
                img={videoProject}
                deleteHandler={() => setVideoProject(null)}
              />
            </div>
          </div>
          <div className="flex w-2/3 flex-col gap-3">
            <div className="flex flex-col gap-3">
              <span>گالری پروژه</span>
              <SelectMedia
                addMedia={(alt, image) => {
                  const newGallery = [
                    ...galleryProject,
                    { alt, url: image.url },
                  ];
                  setGalleryProject(newGallery);
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {galleryProject.map((i, index) => (
                <ImageComponent
                  key={index}
                  img={i}
                  editHandler={({ url, alt }) => {
                    setOpen(true);
                    setEditImg({ url, alt });
                  }}
                  deleteHandler={(img) => {
                    const newDetail = galleryProject.filter((i) => {
                      return i.url !== img.url;
                    });
                    setGalleryProject(newDetail);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Button
            type="submit"
            endIcon={<MdDataSaverOn />}
            color="success"
            variant="contained"
          >
            ذخیره کردن اطلاعات
          </Button>
          <FormControlLabel
            control={
              <Switch
                color="success"
                checked={statusProject ? true : false}
                onChange={() => setValue("status", !statusProject)}
              />
            }
            label="انتشار پروژه"
          />
        </div>
      </form>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const alt = formJson.alt;
            const src = formJson.image;
            const newArry = galleryProject.map((i) => {
              if (i.url === editImg?.url) {
                i.alt = alt;
                i.url = src;
              }
              return i;
            });
            setGalleryProject(newArry);
            setOpen(false);
          },
        }}
      >
        <DialogTitle>ویرایش عکس</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            defaultValue={editImg?.url}
            id="image"
            name="image"
            label="آدرس عکس"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="false"
            autoSave="false"
          />
          <TextField
            autoFocus
            defaultValue={editImg?.alt}
            margin="dense"
            id="alt"
            autoComplete="false"
            autoSave="false"
            name="alt"
            label="ویرایش عنوان"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <div className="flex justify-between items-center w-full">
            <Button
              type="submit"
              color="success"
              variant="contained"
              endIcon={<FaPenToSquare />}
            >
              ذخیره
            </Button>
            <Button
              color="error"
              variant="contained"
              endIcon={<MdClose />}
              onClick={() => setOpen(false)}
            >
              بستن
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}