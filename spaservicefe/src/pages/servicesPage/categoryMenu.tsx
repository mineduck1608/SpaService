import { Category } from '@/types/category'
import { imgs } from './servicesPage.util'

export function CategoryMenu(params: {
  items: Category[]
  onClickItem: (value: string) => void
  currentItem?: string
}) {
  return (
    <div className='w-[310px]'>
      {/* Header */}
      <div className='flex justify-center rounded-tl-[40px] bg-[#8D388A] p-3 text-2xl font-bold text-white'>
        <img src={imgs.logo} alt='Lotus logo' className='inline' />
        &nbsp;Services
      </div>
      <div className='flex flex-col rounded-br-[40px] bg-[url(https://senspa.com.vn/wp-content/themes/thuythu/images/background1.png)] bg-[bottom_50px_right] bg-no-repeat shadow-lg'>
        {params.items.map((v, i) => (
          <div
            className={`flex flex-col
            ${i === params.items.length - 1 ? 'rounded-br-[40px]' : ''}
          `}
          >
            {/* Item container */}
            <div className={`flex justify-center`}>
              <button
                className={`${v.categoryId === params.currentItem ? 'hover:cursor-default' : ''} min-w-[75%] p-3 pl-6 pr-6 text-left`}
                onClick={() => {
                  if (v.categoryId !== params.currentItem) {
                    params.onClickItem(v.categoryId)
                  }
                }}
              >
                {/* Lotus img for selected item */}
                {v.categoryId === params.currentItem && (
                  <span>
                    <img src={imgs.selected} alt='selected' className='inline' />
                    &nbsp;
                  </span>
                )}
                {/* Item name */}
                <span className={`${v.categoryId === params.currentItem ? 'font-bold text-[#8D388A]' : ''}`}>
                  {v.categoryName}
                </span>
              </button>
            </div>
            {/* Line */}
            <div
              className={`w-5/6 self-center 
              ${i !== params.items.length - 1 ? ' border-b-[1.5px]  border-dotted border-purple3' : ''}
              `}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}
