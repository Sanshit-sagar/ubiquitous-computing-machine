import Logo from '../components/Logo'


const Header = () => {

    return (
        <header className="border-b border-gray-100 dark:border-gray-700">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-4">

                <Logo /> 

            </div>
        </header>
    )

}