import React from 'react'

const Hero = () => {
  return (
<section className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center px-6 text-center">
  <h1 className="text-4xl md:text-6xl font-bold mb-4">
    Discover Your Next Favorite Product
  </h1>
  <p className="text-lg text-gray-300 mb-6 max-w-xl">
    High quality, best prices. Shop smart, live better.
  </p>
  <a
    href="/products"
    className="inline-block bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition"
  >
    Browse Products
  </a>
</section>

  )
}

export default Hero