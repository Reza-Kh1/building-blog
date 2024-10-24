"use client"
import { Dialog, DialogActions, DialogContent, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React, { useState } from 'react'
import { IoArrowRedoSharp } from 'react-icons/io5'
import { MdClose } from 'react-icons/md'
import { TbMessageReply } from 'react-icons/tb'
import InputForm from '../InputForm/InputForm'
import ImgTag from '../ImgTag/ImgTag'
import { CommentsType } from '@/app/type'
import { fetchApi } from '@/action/fetchApi'
import CustomButton from '../CustomButton/CustomButton'
import toast from 'react-hot-toast'
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function ResComment({ postId, comment }: { postId: number, comment: CommentsType }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    return (
        <>
            <i className='cursor-pointer hover:text-gray-950 text-gray-500' onClick={() => setOpen(true)}>
                <IoArrowRedoSharp />
            </i>
            <Dialog
                maxWidth="xl"
                open={open}
                fullWidth
                onClose={() => setOpen(false)}
                TransitionComponent={Transition}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        setLoading(true)
                        if (!comment.id || !postId) return
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        const name = formJson.name;
                        const phone = formJson.phone;
                        const text = formJson.text;
                        const body = {
                            email,
                            name,
                            phone,
                            text,
                            replies: comment.id,
                            postId
                        }
                        fetchApi({ url: "comment", body, method: "POST" }).then(() => {
                            toast.success("نظر شما پس از تایید نمایش داده می شود")
                        }).catch((err) => {
                            console.log(err);
                            toast.error("خطایی رخ داد بعدا دوباره تلاش کنید!")
                        }).finally(() => {
                            setLoading(false)
                            setOpen(false)
                        })
                    },
                }}
            >
                <DialogContent>
                    <div className='flex gap-5'>
                        <div className='flex flex-col w-2/3 justify-between items-center gap-3'>
                            <div className='flex w-full flex-wrap gap-3'>
                                <div>
                                    <span className='text-sm mb-1 inline-block'>نام :*</span>
                                    <InputForm type='text' name='name' placeholder='نام' required />
                                </div>
                                <div>
                                    <span className='text-sm mb-1 inline-block'>شماره تلفن :*</span>
                                    <InputForm type='text' name='phone' placeholder='شماره تلفن' onChange={(e) => {
                                        e.target.value = e.target.value.replace(
                                            /[^0-9]/g,
                                            ""
                                        );
                                    }} required />
                                </div>
                                <div>
                                    <span className='text-sm mb-1 inline-block'>ایمیل :</span>
                                    <InputForm type='email' name='email' placeholder='ایمیل' />
                                </div>
                            </div>
                            <div className='w-full'>
                                <span className='text-sm mb-1 inline-block'>کامنت خود را ثبت کنید :*</span>
                                <textarea name="text" rows={6} wrap='6' required className='bg-slate-100 w-full shadow-md focus-visible:outline-blue-300 resize-none p-2 rounded-md' id="" placeholder='نظر خودتان را بنویسید' />
                            </div>
                        </div>
                        <div className='w-1/3 pr-8'>
                            <span>کامنت شخص :</span>
                            <div className='relative w-full'>
                                <div className='w-16 absolute right-0 transform translate-x-1/2 top-4 p-1 bg-white border rounded-full'>
                                    <ImgTag width={80} height={80} className='rounded-full w-14 shadow-md' src={"/image-admin.png"} alt={comment?.name} />
                                </div>
                                <div className='border my-2 rounded-sm shadow-sm pr-10 pl-3 py-5'>
                                    <div className='flex w-full justify-between mb-3'>
                                        <div className='flex flex-col'>
                                            <span className='font-bold text-gray-700'>{comment?.name}</span>
                                            <span className='text-xs text-gray-400 italic'>{new Date(comment?.createdAt).toLocaleDateString("fa")}</span>
                                        </div>
                                    </div>
                                    <div className='text-justify text-sm text-gray-700 pl-5'>
                                        <p>{comment?.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className='w-full flex justify-between'>
                        <CustomButton className='w-2/12' disable={loading} color='blue' name='ارسال' type='submit' iconEnd={<TbMessageReply />} />
                        <CustomButton className='w-2/12' onClick={() => setOpen(false)} name='بستن' iconEnd={<MdClose />} color='warning' disable={loading} type='button' />
                    </div>
                </DialogActions>
            </Dialog >
        </>
    )
}
