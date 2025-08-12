import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, RTE, Input, Select } from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        if (loading) return; // To prevent double click
        setLoading(true); // start loading

        let file = null;
        try {
            if (data.image?.[0]) {
                file = await appwriteService.uploadFile(data.image[0]);
                if (file?.$id && post?.featuredimage) {
                    try {
                        await appwriteService.deleteFile(post.featuredimage);
                    } catch (err) {
                        console.log("Failed to delete file:", err);
                    }

                }
            }

            //  post update
            if (post) {
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredimage: file ? file.$id : undefined
                });
                if (dbPost) {
                    setLoading(false); // stop loading
                    toast.success("Post updated successfully!", { autoClose: 2000 });
                    navigate(`/post/${dbPost.$id}`);
                }
                // new post create
            } else {
                const dbPost = await appwriteService.createPost({
                    ...data,
                    featuredimage: file ? file.$id : undefined,
                    userid: userData.$id
                });
                if (dbPost) {
                    setLoading(false); // stop loading
                    toast.success("Post created successfully!", { autoClose: 2000 });
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            setLoading(false); // stop loading
            await appwriteService.deleteFile(file?.$id);
            toast.error("Something went wrong!", { autoClose: 2000 });
            console.log(error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-');
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto flex flex-col  gap-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200 max-w-[800px]">
            <div className="w-full px-2 mx-auto">
                <Input
                    label="Title:"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug:"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
                />


                <Input
                    label="Featured Image:"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })} />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFileView(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} />

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })} />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full"
                    disabled={loading}>
                    {loading ? "Processing..." : post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
