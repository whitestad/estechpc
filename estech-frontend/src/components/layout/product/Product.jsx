import style from './Product.module.css'
import {trimStringToLength} from "@utils/stringUtils.js";
import Rating from "@components/layout/rating/Rating.jsx";
import LikeButton from "@components/common/likeButton/LikeButton.jsx";
import {Button} from "@components/common/button/Button.jsx";
import {Container} from "@components/common/layouts/Layouts.jsx";



function Product({title, description, price, photos, average_rating, count_of_reviews, count_of_orders=0}) {


    return (
        <Container marginTop={'0'}>

            <div className={style.productCardTopFull}>

                <h1 className={style.headerSection}>{title}</h1>

                <div className={style.imagesSection}>
                    <picture className={style.picture}>
                        <img className={style.image} alt="product main image"
                             src={photos[0].photo}/>
                    </picture>
                </div>

                <div className={style.specBrandSection}>
                    PCI-E 4.0 8 ГБ GDDR6, 128 бит, 3 x DisplayPort, HDMI, GPU 1830 МГц
                </div>

                <div className={style.statSection}>

                </div>

                <div className={style.buySection}></div>

            </div>

        </Container>
    );
}

export {Product};
