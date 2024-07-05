import style from './ProductListItem.module.css'
import Rating from "@components/layout/rating/Rating.jsx";
import LikeButton from "@components/common/likeButton/LikeButton.jsx";
import {Button} from "@components/common/button/Button.jsx";
import {trimStringToLength} from "@utils/stringUtils.js";
import useBasket from "@/hooks/useBasket.js";

import defaultPhoto from '@/assets/no-photo.png';


function ProductListItem({onClick, id, title, short_characteristics, price, photos, average_rating, count_of_reviews, count_of_orders=0}) {
    const photo = photos.length > 0 ? photos[0].photo : defaultPhoto;

    price = price.toString();

    const {addProductToBasket} = useBasket()

    function handleAddProductToBasket() {
        addProductToBasket(id).then((data) => {
            console.log(data);
        });
    }

    return (
        <div onClick={onClick} className={style.product}>
            <div className={style.imageDiv}>
                <img className={style.image} src={photo}></img>
            </div>
            <div className={style.textSection}>

                <div className={style.textSectionInfo}>
                    <span className={style.title}>{title}</span>
                    <span className={style.description}>{trimStringToLength(short_characteristics, 375)}</span>
                </div>

                <div className={style.textSectionStatistics}>
                        <span className={style.productInfo}>Заказано: {count_of_orders}</span>
                    <Rating average={average_rating} count={count_of_reviews}></Rating>
                </div>

            </div>
            <div className={style.buySection}>

                <span className={style.price}>
                    {/*<span className={style.pastPrice}>{info.price + 2000}</span>&nbsp;&nbsp;*/}
                    {price.slice(0, -3)}.
                    <span className={style.smallPrice}>{price.slice(-3)}</span>
                    <span className={style.rub}>₽</span>
                </span>
                <div className={style.buttons}>
                    <LikeButton></LikeButton>
                    <Button extraClasses={[style.buyButton]} onClick={handleAddProductToBasket}>Купить</Button>
                </div>

            </div>
        </div>
    );
}

export default ProductListItem;
