let activeAudioContext: AudioContext | null = null;
let activeSourceNode: AudioBufferSourceNode | null = null;

export function stopAudioPlayback() {
  if (activeSourceNode) {
    try {
      activeSourceNode.stop();
      activeSourceNode.disconnect();
    } catch {
      // Ignore if already stopped
    }
    activeSourceNode = null;
  }
}

export async function playBase64Audio(base64Data: string): Promise<void> {
  stopAudioPlayback();

  const binaryString = window.atob(base64Data);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const sampleRate = 24000;
  const numChannels = 1;
  const dataInt16 = new Int16Array(bytes.buffer);
  const frameCount = Math.floor(dataInt16.length / numChannels);

  if (!activeAudioContext || activeAudioContext.state === 'closed') {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    activeAudioContext = new AudioContextClass({ sampleRate });
  }

  if (activeAudioContext.state === 'suspended') {
    await activeAudioContext.resume();
  }

  const audioBuffer = activeAudioContext.createBuffer(numChannels, frameCount, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }

  const source = activeAudioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(activeAudioContext.destination);
  
  activeSourceNode = source;
  
  return new Promise((resolve) => {
    source.onended = () => {
      activeSourceNode = null;
      resolve();
    };
    source.start(0);
  });
}
