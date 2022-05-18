import styles from "./WeatherBlock.module.scss";
import { WeatherBlockProps } from "./WeatherBlock.types";

/**
 * Weather Block component
 */
const WeatherBlock = ({data}:WeatherBlockProps) => {

    const isDayClass = data.is_day ? styles['weather-block--day'] : styles['weather-block--night'];
    
    return(
        <div className={`${styles['weather-block']} ${ isDayClass }`}>
            <div className={styles['weather-block__inner']}>

                {/* City */}
                <p className={`${styles['weather-block__item']} ${styles['weather-block__city']}`}>
                    {data.city}
                </p>

                {/* Weather icon */}
                <figure className={`${styles['weather-block__item']} ${styles['weather-block__icon']}`}>
                    <img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt={data.weather} />
                </figure>

                {/* Type of weather */}
                <p className={`${styles['weather-block__item']} ${styles['weather-block__weather']}`}>
                    {data.weather}
                </p>

                {/* Current temperature */}
                <p className={`${styles['weather-block__item']} ${styles['weather-block__current']}`}>
                    {data.current}&deg;
                </p>

                {/* Feels like temperature */}
                <p className={`${styles['weather-block__item']} ${styles['weather-block__feels-like']}`}>
                    Feels like: {data.feels_like}&deg;
                </p>

                {/* Minimum & maximum temperatures */}
                <p className={`${styles['weather-block__item']} ${styles['weather-block__temps']}`}>
                    {data.min}&deg; / {data.max}&deg;
                </p>

            </div>
        </div>
    )
}

export default WeatherBlock;