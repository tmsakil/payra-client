import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import { useQuery } from 'react-query';
import DonorListRow from './DonorListRow';
import DonorListDeleteModal from './DonorListDeleteModal';
import { Outlet, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
import DonorListProfileModal from './DonorListProfileModal';

const DonorList = () => {
    const [isSelected, setSelected] = useState(true);
    const navigate = useNavigate()
    const [donorData, setDonorData] = useState(null)
    const [donorProfileData, setDonorProfileData] = useState(null)

    const { data: allDonorList, isLoading, refetch } = useQuery('donorList', () => fetch('http://localhost:5000/verified-donor', {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth)
                localStorage.removeItem('accessToken')
                navigate('/')
            }
            return res.json()
        }))

    if (isLoading) {
        return <Loading />
    }
    const handleComplete = () => {
        setSelected(true)
        navigate("/dashboard/blood-request")
    }
    const handleInComplete = () => {
        setSelected(false)
        navigate("/dashboard/blood-request/incomplete-blood-request")
    }
    return (
        <div>
            <div>
                <section className='px-2 sm:px-0 pt-2'>
                    <div className='flex space-x-1 rounded-xl bg-[#0E1530] p-1 max-w-md mx-auto mb-4'>
                        <button onClick={handleComplete} className={`w-full rounded-lg py-2.5 text-sm font-semibold ${isSelected ? "bg-white text-[#141C39]" : "text-white "}`}>Available</button>
                        <button onClick={handleInComplete} className={`relative w-full rounded-lg py-2.5 text-sm font-semibold ${!isSelected ? "bg-white text-[#141C39]" : "text-white "} `}>Unavailable</button>
                    </div>
                </section>

                <Outlet />
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th className='bangla-font text-[15px] '>সিরিয়াল</th>
                            <th className='bangla-font text-[15px] pl-2'>প্রোফাইল</th>
                            <th className='bangla-font text-[15px] pl-2'>নাম</th>
                            <th className='bangla-font text-[15px] pl-2'>গ্রুপ</th>
                            <th className='bangla-font text-[15px] pl-2'>বয়স</th>
                            <th className='bangla-font text-[15px] pl-2'>লিঙ্গ</th>
                            <th className='bangla-font text-[15px] pl-2'>নাম্বার</th>
                            <th className='bangla-font text-[15px] pl-2'>থানা</th>
                            <th className='bangla-font text-[15px] pl-2'>ইউনিয়ন</th>
                            <th className='bangla-font text-[15px] pl-2'>গ্রাম</th>
                            <th className='bangla-font text-[15px] pl-2'>মোট রক্তদান</th>
                            <th className='bangla-font text-[15px] pl-2'>উপস্থিতি</th>
                            <th className='bangla-font text-[15px] pl-2'>অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allDonorList?.map((donorSingleData, index) => <DonorListRow
                                key={donorSingleData._id}
                                donorSingleData={donorSingleData}
                                refetch={refetch}
                                index={index + 1}
                                setDonorData={setDonorData}
                                setDonorProfileData={setDonorProfileData}
                            ></DonorListRow>)
                        }
                    </tbody>
                </table>
            </div>
            {
                donorData && <DonorListDeleteModal
                    donorData={donorData}
                    setDonorData={setDonorData}
                    refetch={refetch}
                ></DonorListDeleteModal>
            }

            {
                donorProfileData && <DonorListProfileModal
                    key={donorProfileData._id}
                    donorProfileData={donorProfileData}
                    setDonorProfileData={setDonorProfileData}
                    refetch={setDonorProfileData}
                ></DonorListProfileModal>
            }
        </div>
    );
};

export default DonorList;