import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SetSearchedQuery } from '@/redux/jobSlice'

function CategoryCarousel() {
    const categories = [
        "React Developer",
        "MERN Stack",
        "Java Developer",
        "UI/UX Designer",
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "Graphic Designer",
        "FullStack Developer"
    ]
    const dispatch = useDispatch()
    const navigate = useNavigate()

     const searchJobHandler = (query) => {
            dispatch(SetSearchedQuery(query));
            navigate("/browse");
        }

    return (
        <div className="pt-4 pb-10">

            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#111827] mb-3">
                Explore Job Categories
            </h2>

            <p className="text-center text-gray-500 mb-8">
                Discover opportunities based on your skills and interests.
            </p>

            <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent>
                    {categories.map((category) => (

                        <CarouselItem
                            key={category}
                            className="basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"

                        >
                            <Button
                                variant='outline'
                                onClick ={()=> searchJobHandler(category)}
                                className='rounded-full border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all duration-300 px-6'
                            >
                                {category}

                            </Button>


                        </CarouselItem>


                    ))

                    }
                    </CarouselContent>
                    <CarouselPrevious className="border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white" />

                    <CarouselNext className="border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white" />
                    
            </Carousel>
        </div>
    )
}

export default CategoryCarousel
