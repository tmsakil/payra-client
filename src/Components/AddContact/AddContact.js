import React from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';


const AddContact = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        const newData = { ...data }

        fetch('http://localhost:5000/donor-request', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success("Your submission has been sent")
                } else {
                    toast.error("Submission failed")
                }
            })
    };


    return (
        <div>
            <section>
                <h2 className='text-[#141C39] font-semibold text-xl mb-3 mt-5 poppins-font'>Add Contact</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3'>
                        <div className="form-control w-full mx-auto max-w-xs lg:max-w-full">
                            <label className="label">
                                <span className="label-text text-[#141C39]"> নাম <span className='text-red-500 font-extrabold'>*</span></span>
                            </label>
                            <input type="text" placeholder="নাম লিখুন" className={`input h-10 input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.name && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is required"
                                    }
                                })}
                            />
                            {
                                errors.name && <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            }
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-[#141C39]">ফোন নাম্বার <span className='text-red-500 font-extrabold'>*</span></span>
                            </label>
                            <input type="number" placeholder="EX: 01834567890" className={`input h-10 input-bordered w-full max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.number1 && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                {...register("number1", {
                                    required: {
                                        value: true,
                                        message: "Number is required"
                                    },
                                    minLength: {
                                        value: 11,
                                        message: 'Minimum length 11'
                                    },
                                    maxLength: {
                                        value: 11,
                                        message: 'Maximum length 11'
                                    }
                                })}
                            />
                            {
                                errors?.number1 && <label className="label">
                                    {errors?.number1 && <span className="label-text-alt text-red-500">{errors.number1.message}</span>}
                                </label>
                            }
                        </div>











                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-[#141C39]">দ্বিতীয় ফোন নাম্বার </span>
                            </label>
                            <input type="number" placeholder="(অপশনাল)" className={`input h-10 input-bordered w-full max-w-xs focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.number2 && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                {...register("number2", {
                                    minLength: {
                                        value: 11,
                                        message: 'Minimum length 11'
                                    },
                                    maxLength: {
                                        value: 11,
                                        message: 'Maximum length 11'
                                    }
                                })}
                            />
                            {
                                errors?.number2 && <label className="label">
                                    {errors?.number2 && <span className="label-text-alt text-red-500">{errors.number2.message}</span>}
                                </label>
                            }
                        </div>


                        <div className="form-control w-full mx-auto max-w-xs lg:max-w-full">
                            <label className="label">
                                <span className="label-text text-[#141C39]">আপনার নাম <span className='text-red-500 font-extrabold'>*</span></span>
                            </label>
                            <input type="file" placeholder="আপনার নাম লিখুন" className={`input h-10 input-bordered w-full max-w-xs lg:max-w-full focus:border-blue-500 focus:ring-blue-500 focus:ring-1 ${errors.image && "focus:border-red-500 border-red-500 focus:ring-red-500 focus:ring-1"}`}
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: "Image is required"
                                    }
                                })}
                            />
                            {
                                errors.image && <label className="label">
                                    {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                                </label>
                            }
                        </div>

                        <div className='w-full text-center sm:text-start'>
                            <input className='border border-black rounded-lg sm:mt-9 w-full sm:w-40 max-w-xs lg:max-w-full mt-5 bg-white text-black font-bold hover:bg-[#0F1631] h-10 hover:text-white transition-all duration-300 ease-in-out' type="submit" value="Add" />
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddContact;