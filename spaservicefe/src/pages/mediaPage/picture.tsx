import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
const images = [
  'https://senspa.com.vn/wp-content/uploads/2020/11/DSC5837.jpg',
  'https://senspa.com.vn/wp-content/uploads/2020/11/DSC2549-1.png',
  'https://senspa.com.vn/wp-content/uploads/2020/11/DSC5881-2.jpg',
  'https://senspa.com.vn/wp-content/uploads/2020/11/G-sảnh-17.jpg',
  'https://img1.kienthucvui.vn/uploads/2021/01/13/anh-dep-ve-spa_022205055.jpg',
  'https://img5.thuthuatphanmem.vn/uploads/2021/11/20/hinh-anh-spa-thien-nhien-tuyet-dep_104538239.jpg'
]



const Picture = () => {
  
  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
      <div className='container py-4 text-center'>
        <div className='w-100'>
          <div className='row g-4 justify-content-center'>
            {/* Ảnh lớn bên trái */}
            <div className='col-md-7'>
              <img
                src={images[0]}
                alt='Spa Image'
                className='img-fluid w-100-lg'
                style={{ height: '500px', objectFit: 'cover' }}
              />
            </div>

            {/* 2 ảnh nhỏ bên phải */}
            <div className='col-md-4'>
              <div className='row mb-4'>
                <div className='col-12'>
                  <img
                    src={images[1]}
                    alt='Spa Image'
                    className='img-fluid w-100'
                    style={{ height: '238px', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <img
                    src={images[2]}
                    alt='Spa Image'
                    className='img-fluid w-100'
                    style={{ height: '238px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row g-4 justify-content-center mt-1'>
            {/* 2 ảnh nhỏ bên trái */}
            <div className='col-md-4'>
              <div className='row mb-4'>
                <div className='col-12'>
                  <img
                    src={images[3]}
                    alt='Spa Image'
                    className='img-fluid w-100'
                    style={{ height: '238px', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <img
                    src={images[5]}
                    alt='Spa Image'
                    className='img-fluid w-100'
                    style={{ height: '238px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>

            {/* Ảnh lớn bên phải */}
            <div className='col-md-7'>
              <img
                src={images[4]}
                alt='Spa Image'
                className='img-fluid w-100-lg'
                style={{ height: '500px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Picture
