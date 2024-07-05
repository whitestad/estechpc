import style from './Product.module.css'
import {trimStringToLength} from "@utils/stringUtils.js";
import Rating from "@components/layout/rating/Rating.jsx";
import LikeButton from "@components/common/likeButton/LikeButton.jsx";
import {Button} from "@components/common/button/Button.jsx";
import {Container, RowContainer} from "@components/common/layouts/Layouts.jsx";
import Strap from "@components/common/strap/Strap.jsx";
import defaultPhoto from "@/assets/no-photo.png";



function Product({title, short_characteristics, description, price, photos, average_rating, count_of_reviews, count_of_orders=0}) {
    const photo = photos.length > 0 ? photos[0].photo : defaultPhoto;

    return (
        <Strap>

            <div className={style.productCardTopFull}>

                <h1 className={style.headerSection}>{title}</h1>

                <div className={style.imagesSection}>
                    <picture className={style.picture}>
                        <img className={style.image} alt="product main image"
                             src={photos[0].photo}/>
                    </picture>
                </div>

                <div className={style.specBrandSection}>
                    <p>{short_characteristics}</p>
                    <a href={'#'}>Подробнее</a>
                </div>

                <div className={style.statSection}>
                    <RowContainer margin={'0 auto'}>

                        <Strap padding={'0.7rem 1rem'} secondary={true}>
                            <Rating average={average_rating} count={count_of_reviews}/>
                        </Strap>

                        <Strap padding={'0.7rem 1rem'} secondary={true}>
                            <p>Заказано: {count_of_orders}</p>
                        </Strap>

                        <Strap padding={'0.7rem 1rem'} secondary={true}>
                            <p>Отличная надежность</p>
                        </Strap>

                    </RowContainer>
                </div>

                <div className={style.buySection}>

                    <Strap padding={'0.7rem 1rem'} secondary={true} width={'100%'}>
                        <h2>{price} ₽</h2>
                    </Strap>
                    <LikeButton></LikeButton>
                    <Button extraClasses={[style.buyButton]}>Купить</Button>

                </div>

                <div className={style.infoSection}>
                    <Strap padding={'0.7rem 1rem'} secondary={true} width={'50%'}>
                        <p>В налачии 1шт</p>
                    </Strap>
                </div>

                <div>

                </div>

            </div>

        </Strap>
    );
}

export {Product};
