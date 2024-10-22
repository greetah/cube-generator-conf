"use client"

import React, { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls, useTexture, Environment } from "@react-three/drei";
import * as THREE from "three"
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon, ShareIcon } from "lucide-react"
import { Inter } from 'next/font/google'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const inter = Inter({ subsets: ['latin'] })

const DEFAULT_COLOR = "#006EFE"

const GAP_SIZE = 0.005

function CubeFace({ position, rotation, children, color, glossiness, blur }) {
  return (
    (<group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[2.98, 2.98]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.8}
          metalness={glossiness * 0.5}
          roughness={blur}
          clearcoat={glossiness}
          clearcoatRoughness={0.1}
          reflectivity={1}
          envMapIntensity={glossiness} />
      </mesh>
      {children}
    </group>)
  );
}

function NextJsConfLogo() {
  const texture = useTexture(
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nextjslogo-kKdOOxBFvwy5iDLWE6Km6oVAUj9ujf.svg'
  )
  return (
    (<group scale={[0.0035, 0.0035, 0.0035]} position={[0, 0, 0.01]}>
      <mesh>
        <planeGeometry args={[761, 127]} />
        <meshBasicMaterial map={texture} transparent={true} side={THREE.DoubleSide} />
      </mesh>
    </group>)
  );
}

function VercelLogo() {
  return (
    (<group scale={[0.45, 0.45, 0.45]} position={[0, 0, 0.01]}>
      <mesh>
        <shapeGeometry
          args={[new THREE.Shape().moveTo(0, 1.5).lineTo(1.5, -1.5).lineTo(-1.5, -1.5).closePath()]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>
    </group>)
  );
}

function DateText() {
  return (
    (<group>
      <Text
        position={[0, 0.15, 0.01]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Regular.ttf">
        Oct 24
      </Text>
      <Text
        position={[0, -0.15, 0.01]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/GeistMono-Regular.ttf">
        2024
      </Text>
    </group>)
  );
}

function Cube({ name, company, color, glossiness, blur, lightIntensity, rotationSpeed }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  const offset = 1.5 + GAP_SIZE / 2

  return (
    (<group ref={meshRef}>
      <ambientLight intensity={lightIntensity} />
      <pointLight position={[10, 10, 10]} intensity={lightIntensity} />
      <pointLight position={[-10, -10, -10]} intensity={lightIntensity} />
      {/* Front face - Name and Title */}
      <CubeFace
        position={[0, 0, offset]}
        rotation={[0, 0, 0]}
        color={color}
        glossiness={glossiness}
        blur={blur}>
        <group position={[-1.3, -1.3, 0.02]}>
          <Text
            position={[0, 1.1, 0]}
            fontSize={name.length > 20 ? 0.25 : 0.35}
            color="white"
            anchorX="left"
            anchorY="bottom"
            font="/fonts/Geist-Bold.ttf"
            maxWidth={2.6}
            characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'">
            {name}
          </Text>
          <Text
            position={[0, 0.6, 0]}
            fontSize={company.length > 30 ? 0.12 : 0.18}
            color="white"
            anchorX="left"
            anchorY="top"
            font="/fonts/Geist-Regular.ttf"
            maxWidth={2.6}
            characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'">
            {company}
          </Text>
        </group>
      </CubeFace>
      {/* Back face - I'm going to Next.js Conf */}
      <CubeFace
        position={[0, 0, -offset]}
        rotation={[0, Math.PI, 0]}
        color={color}
        glossiness={glossiness}
        blur={blur}>
        <Text
          position={[-1.3, 1.1, 0.02]}
          fontSize={0.3}
          color="white"
          anchorX="left"
          anchorY="top"
          font="/fonts/Geist-Regular.ttf"
          maxWidth={2.6}
          characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'">
          I'm going to
        </Text>
        <Text
          position={[-1.3, 0.6, 0.02]}
          fontSize={0.3}
          color="white"
          anchorX="left"
          anchorY="top"
          font="/fonts/Geist-Bold.ttf"
          maxWidth={2.6}
          characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'">
          Next.js Conf
        </Text>
      </CubeFace>
      {/* Right face - Next.js Conf logo */}
      <CubeFace
        position={[offset, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        color={color}
        glossiness={glossiness}
        blur={blur}>
        <NextJsConfLogo />
      </CubeFace>
      {/* Left face - Vercel logo */}
      <CubeFace
        position={[-offset, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        color={color}
        glossiness={glossiness}
        blur={blur}>
        <VercelLogo />
      </CubeFace>
      {/* Top face - Date */}
      <CubeFace
        position={[0, offset, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        color={color}
        glossiness={glossiness}
        blur={blur}>
        <DateText />
      </CubeFace>
      {/* Bottom face - Date */}
      <CubeFace
        position={[0, -offset, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        color={color}
        glossiness={glossiness}
        blur={blur}>
        <DateText />
      </CubeFace>
    </group>)
  );
}

function Scene({ name, company, color, glossiness, blur, lightIntensity, environment, rotationSpeed }) {
  return (<>
    <Environment preset={environment} />
    <Cube
      name={name}
      company={company}
      color={color}
      glossiness={glossiness}
      blur={blur}
      lightIntensity={lightIntensity}
      rotationSpeed={rotationSpeed} />
    <OrbitControls enableZoom={false} />
  </>);
}

const profanities = ['badword1', 'badword2', 'badword3']; // Add more words as needed

function filterProfanity(text) {
  const words = text.split(' ');
  return words.map(
    word => profanities.includes(word.toLowerCase()) ? '*'.repeat(word.length) : word
  ).join(' ');
}

export function CustomizableCubeGenerator() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [name, setName] = useState(searchParams.get('name') || "Your Name")
  const [company, setCompany] = useState(searchParams.get('company') || "Your Company")
  const [color, setColor] = useState(searchParams.get('color') || DEFAULT_COLOR)
  const [glossiness, setGlossiness] = useState(parseFloat(searchParams.get('glossiness') || "0.9"))
  const [blur, setBlur] = useState(parseFloat(searchParams.get('blur') || "0.1"))
  const [lightIntensity, setLightIntensity] = useState(parseFloat(searchParams.get('lightIntensity') || "1.5"))
  const [showControls, setShowControls] = useState(true)
  const [shareLink, setShareLink] = useState("")
  const [environment, setEnvironment] = useState("city")
  const [rotationSpeed, setRotationSpeed] = useState(0.2)
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const generateShareLink = () => {
    const params = new URLSearchParams({
      name,
      company,
      color,
      glossiness: glossiness.toString(),
      blur: blur.toString(),
      lightIntensity: lightIntensity.toString()
    })
    const link = `${window.location.origin}${window.location.pathname}?${params.toString()}`
    setShareLink(link)
    navigator.clipboard.writeText(link)
      .then(() => alert("Share link copied to clipboard!"))
      .catch(err => console.error('Failed to copy link: ', err))
  }

  return (
    (<div
      className={`w-full min-h-screen bg-black text-white p-8 flex flex-col justify-between ${inter.className}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nextjslogo-kKdOOxBFvwy5iDLWE6Km6oVAUj9ujf.svg"
            alt="Next.js"
            className="h-12" />
        </div>
        <p className="text-2xl">October 24th</p>
      </div>
      <div
        className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8">
        <div
          className={`w-full ${showControls ? 'md:w-1/2' : 'md:w-full'} transition-all duration-300 ease-in-out relative`}>
          <div
            className={`w-full ${showControls ? 'h-[400px]' : 'h-[600px]'} mb-4 transition-all duration-300 ease-in-out`}>
            <Canvas camera={{ position: [0, 0, 6] }}>
              <Scene
                name={name}
                company={company}
                color={color}
                glossiness={glossiness}
                blur={blur}
                lightIntensity={lightIntensity}
                environment={environment}
                rotationSpeed={rotationSpeed} />
            </Canvas>
          </div>
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={generateShareLink}
              aria-label="Share cube configuration"
              className="bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-200">
              <ShareIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowControls(!showControls)}
              aria-label={showControls ? "Hide controls" : "Show controls"}
              className="bg-black bg-opacity-50 hover:bg-opacity-75 transition-all duration-200">
              {showControls ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {showControls && (
          <div className="w-full md:w-1/2 space-y-4 max-h-[600px] overflow-y-auto pr-4">
            <div>
              <Label htmlFor="name" className="text-gray-400 font-mono sr-only">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(filterProfanity(e.target.value))}
                className="bg-black border-gray-700 rounded-none h-10 font-mono text-gray-400 overflow-hidden whitespace-nowrap"
                style={{ textOverflow: 'ellipsis' }}
                placeholder="Your Name"
                onFocus={(e) => {
                  e.target.select();
                  setName('');
                }}
                ref={nameInputRef} />
            </div>
            <div>
              <Label htmlFor="company" className="text-gray-400 font-mono sr-only">Company</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(filterProfanity(e.target.value))}
                className="bg-black border-gray-700 rounded-none h-10 font-mono text-gray-400 overflow-hidden whitespace-nowrap"
                style={{ textOverflow: 'ellipsis' }}
                placeholder="Your Company"
                onFocus={(e) => {
                  e.target.select();
                  setCompany('');
                }} />
            </div>
            <div className="flex items-center  space-x-2">
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-20 bg-black border-gray-700 rounded-none text-gray-400" />
              <Input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-24 bg-black border-gray-700 rounded-none text-gray-400"
                placeholder="#RRGGBB" />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setColor(DEFAULT_COLOR)}
                aria-label="Reset color"
                className="h-10 w-10 bg-black hover:bg-gray-900 border-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </Button>
            </div>
            <div>
              <Label className="text-gray-400 font-mono">Glossiness: {glossiness.toFixed(2)}</Label>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[glossiness]}
                onValueChange={(value) => setGlossiness(value[0])}
                className="my-2" />
            </div>
            <div>
              <Label className="text-gray-400 font-mono">Blur: {blur.toFixed(2)}</Label>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[blur]}
                onValueChange={(value) => setBlur(value[0])}
                className="my-2" />
            </div>
            <div>
              <Label className="text-gray-400 font-mono">Light Intensity: {lightIntensity.toFixed(1)}</Label>
              <Slider
                min={0}
                max={3}
                step={0.1}
                value={[lightIntensity]}
                onValueChange={(value) => setLightIntensity(value[0])}
                className="my-2" />
            </div>
            <div>
              <Label className="text-gray-400 font-mono">Environment</Label>
              <Select value={environment} onValueChange={setEnvironment}>
                <SelectTrigger className="w-full bg-black border-gray-700 text-gray-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunset">Sunset</SelectItem>
                  <SelectItem value="dawn">Dawn</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="forest">Forest</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="park">Park</SelectItem>
                  <SelectItem value="lobby">Lobby</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-400 font-mono">Rotation Speed: {rotationSpeed.toFixed(2)}</Label>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[rotationSpeed]}
                onValueChange={(value) => setRotationSpeed(value[0])}
                className="my-2" />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-end">
        <Link href="https://www.nextjs.org.com/conf" className="flex items-center">
          <span className="text-2xl font-normal mr-2">Get tickets</span>
          
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round" />
          </svg>
        </Link>
        <Link href="https://nextjs.org/conf" className="text-2xl font-normal">
          nextjs.org<span style={{ color: color }}>/conf</span>
        </Link>
      </div>
    </div>)
  );
}