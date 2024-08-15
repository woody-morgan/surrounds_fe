import React from 'react'
import { Image } from '@components/common'
import { motion } from 'framer-motion'
import { useRoomCreateModal } from '@src/context/ModalContext'

const Header = () => {
  const openRoomCreateModal = useRoomCreateModal()

  return (
    <motion.div className="md:hidden z-10 absolute border-solid border-2 border-[rgba(0,0,0,0.6)] rounded-2xl w-full h-14 top-2 bg-gray-200 md:max-w-screen-md md:left-2/4 md:translate-x-[-50%]">
      <div className="flex h-full px-3 py-1 items-center justify-between">
        <Image
          className="rounded-3xl"
          src="/profiles/default.png"
          width={40}
          height={40}
          alt="profile"
        />
        <div onClick={() => openRoomCreateModal()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18.474"
            height="18.474"
            viewBox="0 0 18.474 18.474"
          >
            <line
              id="선_4"
              data-name="선 4"
              x2="15.474"
              transform="translate(1.5 9.237)"
              fill="none"
              stroke="#707070"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <line
              id="선_5"
              data-name="선 5"
              x2="15.474"
              transform="translate(9.237 1.5) rotate(90)"
              fill="none"
              stroke="#707070"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default Header
