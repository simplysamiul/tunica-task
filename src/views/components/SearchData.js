import { useForm } from "react-hook-form";
import '../../styles/SearchData.css';

const SearchData = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <div className='search-field-area'>
            <div className="search-field-container">
                <div className="search-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Name*" {...register("Name", { required: true })} />
                    <input type="text" placeholder='School*' {...register("School", { required: true })} />
                    <input type="number" placeholder='Class*' {...register("class", { required: true })} />
                    <input type="text" placeholder='Division*' {...register("Division", { required: true })} />
                    <button className="search-button" type="submit">Search</button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default SearchData;