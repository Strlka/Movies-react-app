import { Wrap } from '@chakra-ui/react'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterShareButton, VKIcon, VKShareButton, WhatsappIcon, WhatsappShareButton, XIcon } from 'react-share';

interface Props {
    slug: string;
    title: string;
}


const ShareButtons = ({slug, title}: Props) => {

    const url = `http://localhost:5173/movies/${slug}`;

  return (
    <Wrap gap='2'>
        <FacebookShareButton url={url}>
            <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
            <XIcon size={32} round />
        </TwitterShareButton>
        <TelegramShareButton url={url} title={title}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <VKShareButton url={url}>
          <VKIcon size={32} round />
        </VKShareButton>
        <WhatsappShareButton url={url} title={title} separator=": ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
    </Wrap>
  )
}

export default ShareButtons
