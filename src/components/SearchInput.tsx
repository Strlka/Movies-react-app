import useMovieQueryStore from '../store';
import { Icon, Input, InputGroup } from '@chakra-ui/react'
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
        <InputGroup startElement={<Icon as={BsSearch} />}>
            <Input ref={ref} type='search' borderRadius={20} placeholder='Search movies...' variant='subtle' fontSize='16px'/>
        </InputGroup>
    </form>
  )
}

export default SearchInput
