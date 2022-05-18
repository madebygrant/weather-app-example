export type WeatherBlockProps = {
    data: {
        city:string,
        feels_like:string,
        min: number,
        max: number,
        current: number,
        weather: string,
        icon: string,
        is_day: boolean
    }
}