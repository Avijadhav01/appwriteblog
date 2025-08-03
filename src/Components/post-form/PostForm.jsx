import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, RTE, Input, Select } from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .toLowerCase()
                .trim()
                .replace(/[\s\W-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
            console.log("userdata: ", userData)
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
        try {
            let file = null;

            if (data.image?.[0]) {
                file = await appwriteService.uploadFile(data.image[0]);

                if (file && post?.featuredimage) {
                    await appwriteService.deleteFile(post.featuredimage);
                }
            }

            if (!post && !file?.$id) {
                alert('Image upload failed or not provided.');
                return;
            }

            if (post) {
                const updatedPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredimage: file ? file.$id : post.featuredimage,
                });

                if (updatedPost) {
                    alert('Post updated successfully!');
                    navigate(`/post/${updatedPost.$id}`);
                }
            } else {
                if (userData.$id) {
                    const newPost = await appwriteService.createPost({
                        ...data,
                        featuredimage: file?.$id || '',
                        userid: userData.$id,
                    });
                    console.log("New Post:", newPost);
                    if (newPost) {
                        alert('Post created successfully!');
                        navigate(`/post/${newPost.$id}`);
                    }
                } else {
                    console.log("hii")
                }

            }
        } catch (error) {
            console.error('Failed to submit post:', error);
            alert('Something went wrong while submitting. Check console for details.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        >
            {/* Left side */}
            <div className="flex-1 space-y-4">
                <Input
                    label="Title:"
                    placeholder="Enter post title"
                    className="w-full"
                    {...register('title', { required: true })}
                />
                {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

                <Input
                    label="Slug:"
                    placeholder="Auto-generated from title"
                    onInput={(e) =>
                        setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }
                    className="w-full"
                    {...register('slug', { required: true })}
                />
                {errors.slug && <p className="text-red-500 text-sm">Slug is required</p>}

                <RTE label="Content:" name="content" control={control} defaultValue={getValues('content')} />
            </div>

            {/* Right side */}
            <div className="w-full md:w-1/3 space-y-4">
                <Input
                    label="Featured Image:"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register('image', { required: !post })}
                />
                {errors.image && <p className="text-red-500 text-sm">Image is required</p>}

                {post?.featuredimage && (
                    <div className="w-full">
                        <img
                            src={appwriteService.getFileView(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg shadow-sm border border-gray-300"
                        />
                    </div>
                )}

                <Select
                    options={['active', 'inactive']}
                    label="Status:"
                    className="w-full"
                    {...register('status', { required: true })}
                />
                {errors.status && <p className="text-red-500 text-sm">Status is required</p>}

                <Button type="submit" bgColor="bg-green-600" className="w-full hover:bg-green-700">
                    {post ? 'Update Post' : 'Create Post'}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
