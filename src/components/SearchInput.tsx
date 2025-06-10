import useMovieQueryStore from '../store';
import { Input, InputGroup } from '@chakra-ui/react'
import { useRef } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';



const SearchInput = () => {

    const ref = useRef<HTMLInputElement>(null);
    const setSearchText = useMovieQueryStore(s => s.setSearchText);
    const navigate = useNavigate();

  return (
    <form onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
            setSearchText(ref.current.value);
            navigate('/');
            ref.current.value = '';
        }
    }}>
        <InputGroup startElement={<BsSearch />}>
            <Input ref={ref} borderRadius={20} placeholder='Search movies...' variant='subtle'/>
        </InputGroup>
    </form>
  )
}

export default SearchInput
