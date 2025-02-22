import React from 'react'

export default function PageNumber(params: { n: number; onClick: (n: number) => void; cur?: number }) {
  return (
    <div className='flex justify-center '>
      {Array.from({ length: params.n }).map((v, i) => (
        <Button n={i} onClick={params.onClick} cur={params.cur} />
      ))}
    </div>
  )
}
function Button(param: { n: number; onClick?: (n: number) => void; cur?: number }) {
  return (
    <button
      className={`mx-2 w-[6%] rounded-br-2xl rounded-tl-2xl border-2 border-[#8D388A] ${param.n === param.cur ? 'bg-[#8d388a] text-white' : 'bg-white p-2 text-[#8D388A] duration-300 hover:-translate-x-1 hover:shadow-[1px_1px_#8D388A,2px_2px_#8D388A]'}`}
      onClick={() => {
        if (param.n !== param.cur) {
          param.onClick?.(param.n)
        }
      }}
    >
      {param.n + 1}
    </button>
  )
}
