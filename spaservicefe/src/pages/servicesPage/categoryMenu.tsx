import { Category } from '@/types/category'
import { imgs } from './servicesPage.util'

export function CategoryMenu(params: { items: Category[]; onClickItem: (value: string) => void, currentItem?: string }) {
  return (
    <div className='w-[310px]'>
      {/* Header */}
      <div className='flex justify-center rounded-tl-[40px] bg-[#8D388A] p-3 text-2xl font-bold text-white'>
        <img src={imgs.logo} alt='Lotus logo' className='inline' />
        &nbsp;Services
      </div>
      <div className='flex flex-col rounded-br-[40px] shadow-lg'>
        {params.items.map((v, i) => (
          <div
            className={`flex flex-col
            ${i === params.items.length - 1 ? 'rounded-br-[40px]' : ''}
          `}
          >
            {/* Item container */}
            <div className={`flex justify-center`}>
              <button
                className={`bg-slate-300 p-3 pl-6 pr-6 text-left min-w-[75%]`}
                onClick={() => {
                  params.onClickItem(v.categoryId)
                }}
              >
                <span>
                  {v.categoryName}
                </span>
              </button>
            </div>
            {/* Line */}
            <div
              className={`w-11/12 self-center 
              ${i !== params.items.length - 1 ? ' border-b-2 ' : ''}
              `}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}
