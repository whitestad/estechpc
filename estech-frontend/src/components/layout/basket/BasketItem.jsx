import style from './BasketItem.module.css'
import Rating from "@components/layout/rating/Rating.jsx";
import LikeButton from "@components/common/likeButton/LikeButton.jsx";
import {Button} from "@components/common/button/Button.jsx";
import {FieldsGroup} from "@components/layout/fieldsGroup/FieldGroup.jsx";
import CounterInput from "@components/common/сounterInput/CounterInput.jsx";


function BasketItem({onClick, title, price, photo, average_rating, count_of_reviews, count_of_orders=0}) {
    price = price.toString();

    return (
        <div onClick={onClick} className={style.item}>
            <img className={style.image} src={photo}></img>
            <div className={style.infoSection}>

                <div className={style.textSectionInfo}>
                    <h3 className={style.title}>{title}</h3>
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

                <CounterInput></CounterInput>

                <FieldsGroup>
                    <LikeButton></LikeButton>
                    <LikeButton></LikeButton>
                </FieldsGroup>

            </div>
        </div>
    );
}

export default BasketItem;
