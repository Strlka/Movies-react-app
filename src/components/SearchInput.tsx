import { Input, InputGroup } from '@chakra-ui/react'
import { useRef } from 'react'
import { BsSearch } from 'react-icons/bs'

interface Props {
    onSearch: (serachText: string) => void;
}

const SearchInput = ({onSearch}: Props) => {

    const ref = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
            onSearch(ref.current.value);
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
