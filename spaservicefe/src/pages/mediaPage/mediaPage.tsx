import Picture from "./picture"

const MediaPage = () => {
  return (
    <>
    <img src="https://senspa.com.vn/wp-content/uploads/2020/11/DSC5622.jpg" alt="Header Picture" />
    <section className="section gallery_category_page">
      <div className="grid-container">
    <h2 className="heading_h2 heading_line heading_h2_line_center text_center">
      Media
    </h2>
    <Picture/>
    </div>
    </section>
    </>
  )
}

export default MediaPage
