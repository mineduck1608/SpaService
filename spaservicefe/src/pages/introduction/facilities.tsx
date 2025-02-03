import React, { useState } from 'react'
import { X } from 'lucide-react'
import IntroHeader from '../../components/introductionHeader'


const Modal = ({ facility, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [facility.image, ...facility.additionalImages];

    return (
        <div>
            
        </div>
    )
}

const Facilities = () => {
    const facilities = [
        {
            title: "1st floor",
            description: "Relaxation lounge with comfortable recliners and soothing ambiance",
            image: "",
            additionalImages: [ "",
                                ""
            ]
        },
        {
            title: "2nd floor",
            description: "Tranquil corridor with bamboo-inspired decor",
            image: "",
            additionalImages: [ "",
                                ""
            ]
        },
        {
            title: "3rd floor",
            description: "Private massage rooms with ambient lighting",
            image: "",
            additionalImages: [ "",
                                ""
            ]
        },
        {
            title: "4th floor",
            description: "Steam and sauna facilities for ultimate relaxation",
            image: "",
            additionalImages: [ "",
                                ""
            ]
        },
        {
            title: "5th floor",
            description: "Therapeutic massage rooms with premium amenities",
            image: "",
            additionalImages: [ "",
                                ""
            ]
        },
        {
            title: "6th floor",
            description: "VIP rooms with exclusive services",
            image: "",
            additionalImages: [ "",
                                ""
            ]
        },
        {
            title: "7th floor",
            description: "Luxurious retreat rooms for extended relaxation",
            image: "",
            additionalImages: [ "",
                                ""
            ]
        }
    ]
    const [selectedFacility, setSelectedFacility] = useState(null);

    return (
        <div className='container mx-auto p-4'>
            <IntroHeader title={"Facilities"}/>

        </div>
    )
}

export default Facilities