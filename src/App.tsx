import { useState, useEffect } from 'react'

function App() {
  const [address, setAddress] = useState<string | null>(null)
  const [data, setData] = useState<string>('')
  const [walletArray, setWalletArray] = useState<any>()
  const [length, setLength] = useState<number>(0)
  const [have, setHave] = useState<boolean>(false)

  const onChange = (e: any) => {
    console.log(e.target.value)
    setAddress(e.target.value)
    data.includes(e.target.value) ? setHave(true) : setHave(false)
  }


  const readWallets = async () => {
    const text = await fetch('/wallets.txt').then((res) => res.text())
    setData(text)
    setWalletArray(text.split('\r\n'))
    setLength(text.split('\r\n').length)
  }

  useEffect(() => {
    readWallets()
  }, [])

  return (
    <div className="flex flex-col text-white min-h-screen bg-gray-800">
      <div className='flex flex-col items-center bg-[#6D0C0C] w-full py-5'>
        <div className='text-center text-2xl font-bold'>
          Torsten Sharks Whitelist Registry
        </div>
        <div className='w-full px-2'>
          <div className="w-full pt-2 flex flex-row items-center justify-center">
            <div className='relative lg:w-[800px] w-full'>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input
                type="text"
                id="wallet-search"
                className="bg-gray-900 border border-gray-300 w-full  text-gray-300 text-md rounded-lg py-2 focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5 outline-none"
                placeholder="Search"
                onChange={onChange}
                value={address || ''}
                required
              />
            </div>

          </div>
        </div>

      </div>
      <div className='flex flex-col justify-center items-center pt-10 px-2'>
        <div className='rounded-lg bg-gray-900 px-3 lg:w-[800px] w-full h-[75vh]'>
          <div className='text-lg pt-5'>Enter Wallet Address Above</div>
          <div className='w-full h-5 border-t border-white-1' />
          {
            address ?
              <>
                {
                  have ?
                    <div className='text-gray-400'>You are not whitelisted!</div> : <div className='text-gray-400'>You are whitelisted!</div>
                }
              </>
              :
              <div className='text-gray-600'>
                Check to see if you're registered for Torsten Sharks!
              </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
