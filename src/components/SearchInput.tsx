import useMovieQueryStore from '../store';
import { Icon, Input, InputGroup } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';



const SearchInput = ({clearValue, onValueChange}: {clearValue: boolean, onValueChange: () => void}) => {

    const ref = useRef<HTMLInputElement>(null);
    const setSearchText = useMovieQueryStore(s => s.setSearchText);
    const navigate = useNavigate();

    useEffect(() => {
        if (ref.current) {
            ref.current.value = '';
            ref.current.blur();
        }
    }, [clearValue]);

  return (
    <form onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
            setSearchText(ref.current.value);
            navigate('/');
            ref.current.value = '';
            ref.current.blur();
        }
    }}>
        <InputGroup startElement={<Icon as={BsSearch} />}>
            <Input 
                ref={ref} 
                type='search'
                enterKeyHint='search'
                borderRadius={20}
                placeholder='Search movies...'
                variant='subtle' 
                fontSize='16px'
                onChange={() => {
                    if (ref.current) {
                        setSearchText(ref.current.value);
                        onValueChange();
                        navigate('/');
                    };
                }}
            />
        </InputGroup>
    </form>
  )
}

export default SearchInput
