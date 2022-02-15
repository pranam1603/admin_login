import React, {useState, useEffect} from 'react'

const Verify = () => {

    const [OTP1, setOtp1] = useState('')
    const [OTP2, setOtp2] = useState('')
    const [OTP3, setOtp3] = useState('')
    const [OTP4, setOtp4] = useState('')
    const [Loading, setLoading] = useState(false)
    const [Active, setActive] = useState(1)

    useEffect(() => {
		if(Active>0&&Active<5) document.getElementById("otp-"+(Active).toString()).focus()
		else document.getElementById("otp-4").blur()
	}, [Active])

	const handleOTPChange = (setOTP, val) => {
		if(val.length < 2) setOTP(val)
		if(val.length === 1) setActive(old=>old+1)
	}

    useEffect(() => {
        let otp = OTP1.toString() + OTP2.toString() + OTP3.toString() + OTP4.toString()
        if(otp.length === 4) verifyCode(otp)
    }, [OTP1, OTP1, OTP2, OTP3, OTP4, verifyCode]);

    const verifyCode = code => {
        console.log({code});
    }

    return (
        <div>
            <input id="otp-1" type="number" value={OTP1} onChange={e => handleOTPChange(setOtp1, e.target.value)} min="0" max="9"/>
            <input id="otp-2" type="number" value={OTP2} onChange={e=> handleOTPChange(setOtp2, e.target.value)} min="0" max="9"/>
            <input id="otp-3" type="number" value={OTP3} onChange={e=> handleOTPChange(setOtp3, e.target.value)} min="0" max="9"/>
            <input id="otp-4" type="number" value={OTP4} onChange={e=> handleOTPChange(setOtp4, e.target.value)} min="0" max="9"/>
        </div>   
    )
}

export default Verify