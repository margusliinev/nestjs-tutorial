import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface Data {
    data: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    };
    message: string;
    success: boolean;
}

const Home = () => {
    const [data, setData] = useState<Data>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formDataObject: any = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataObject),
        });

        const responseData = await response.json();
        setData(responseData);
    };

    console.log(data);

    return (
        <main>
            <div className='w-screen h-screen grid place-items-center'>
                <div className='grid lg:flex items-center justify-center gap-8 py-10'>
                    <form onSubmit={handleSubmit} className='grid gap-4 w-96 p-8 border rounded-md shadow-md bg-card text-card-foreground'>
                        <h1 className='text-xl font-semibold text-center mb-4'>Create your account</h1>
                        <div className='grid gap-3'>
                            <Label htmlFor='firstName'>First name</Label>
                            <Input type='text' id='firstName' name='firstName' autoComplete='firstName'></Input>
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor='lastName'>Last name</Label>
                            <Input type='text' id='lastName' name='lastName' autoComplete='lastName'></Input>
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor='username'>Username</Label>
                            <Input type='text' id='username' name='username' autoComplete='username'></Input>
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor='email'>Email</Label>
                            <Input type='email' id='email' name='email' autoComplete='email'></Input>
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor='password'>Password</Label>
                            <Input type='password' id='password' name='password' autoComplete='password'></Input>
                        </div>
                        <Button type='submit' size={'sm'} className='mt-2'>
                            Sign up
                        </Button>
                        <div className='mt-2 flex items-center text-center gap-2 justify-self-center'>
                            <p className='text-sm text-center'>Already have an account? </p>
                            <Link to={'#'} className='text-sm'>
                                Login
                            </Link>
                        </div>
                    </form>
                    <div className='bg-gray-900 p-4 rounded-md max-w-xl mx-auto'>
                        <h1 className='text-white font-semibold text-xl text-center mb-2'>Server Response</h1>
                        <hr className='border-b border-white mb-4' />
                        <h2 className='text-white font-medium text-lg mb-2 flex justify-between items-center gap-10'>
                            <p>Server Message:</p> {data && data?.message}
                        </h2>
                        <ul className='text-white grid gap-4 text-left whitespace-nowrap'>
                            <li className='flex justify-between items-center gap-20'>
                                <p>User ID:</p> {data && data?.data?.id}
                            </li>
                            <li className='flex justify-between items-center gap-20'>
                                <p>First name:</p> {data && data?.data?.firstName}
                            </li>
                            <li className='flex justify-between items-center gap-20'>
                                <p>Last name:</p> {data && data?.data?.lastName}
                            </li>
                            <li className='flex justify-between items-center gap-20'>
                                <p>Username:</p> {data && data?.data?.username}
                            </li>
                            <li className='flex justify-between items-center gap-20'>
                                <p>Email:</p> {data && data?.data?.email}
                            </li>
                            <li className='flex justify-between items-center gap-20'>
                                <p>createdAt:</p> {data && data?.data?.createdAt ? new Date(data && data?.data?.createdAt).toISOString() : ''}
                            </li>
                            <li className='flex justify-between items-center gap-20'>
                                <p>updatedAt:</p> {data && data?.data?.updatedAt ? new Date(data && data?.data?.updatedAt).toISOString() : ''}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
