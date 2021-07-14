import { Image, HeadHomeButton, NotFoundWrapper, NotFoundText } from './NotFoundPageSC';
import logo from '../../logo.svg';

export const NotFoundPage = (): JSX.Element => (
    <NotFoundWrapper id="404body">
        <Image src={logo} alt="logo" />
        <NotFoundText>
            Oops! We're pretty <i>Certn</i> that page does not exist
        </NotFoundText>
        <HeadHomeButton href="/search">Back to Search</HeadHomeButton>
    </NotFoundWrapper>
);
