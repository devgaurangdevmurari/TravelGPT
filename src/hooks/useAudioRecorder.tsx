import {useState} from 'react';
import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import usePermissions from './usePermissions';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const useAudioRecorder = () => {
  const {checkPermission} = usePermissions();

  const [playTime, setPlayTime] = useState<string>('0:00');
  const [isPreviewPlaying, setIsPreviewPlaying] = useState<boolean>(false);
  const [isMessagePlaying, setIsMessagePlaying] = useState<boolean>(false);
  const [recordedUri, setRecordedUri] = useState<string>('');
  const [recordTime, setRecordTime] = useState<string>('0:00');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const onStartRecord = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) return;

    try {
      const fileName = `recording_${Date.now()}.m4a`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      const uri = await audioRecorderPlayer.startRecorder(filePath);

      audioRecorderPlayer.addRecordBackListener(e => {
        const duration = Math.floor(e.currentPosition / 1000);
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        setRecordTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      });

      setRecordedUri(uri);
      setIsRecording(true);
      setShowPreview(false);
    } catch (err) {
      console.log('startRecord error:', err);
    }
  };

  const onStopRecord = async () => {
    try {
      const uri = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      setShowPreview(true);
      setPlayTime('0:00');
      setRecordedUri(uri);
    } catch (err) {
      console.log('stopRecord error:', err);
    }
  };

  const onCancelRecord = async () => {
    try {
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      setShowPreview(false);
      setRecordedUri('');
      setRecordTime('0:00');
      setPlayTime('0:00');
      setIsPreviewPlaying(false);
    } catch (err) {
      console.log('cancelRecord error:', err);
    }
  };

  const onPlayPreview = async () => {
    try {
      if (isPreviewPlaying) {
        setIsPreviewPlaying(false);
        await audioRecorderPlayer.stopPlayer();
      } else {
        if (isMessagePlaying) {
          await audioRecorderPlayer.stopPlayer();
          setIsMessagePlaying(false);
          setPlayingAudio(null);
        }

        setIsPreviewPlaying(true);
        await audioRecorderPlayer.startPlayer(recordedUri);

        audioRecorderPlayer.addPlayBackListener(e => {
          const duration = Math.floor(e.currentPosition / 1000);
          const minutes = Math.floor(duration / 60);
          const seconds = duration % 60;
          setPlayTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);

          if (e.currentPosition === e.duration) {
            audioRecorderPlayer.stopPlayer();
            setIsPreviewPlaying(false);
            setPlayTime('0:00');
          }
        });
      }
    } catch (err) {
      console.log('playPreview error:', err);
    }
  };

  const onPlayAudio = async (uri: string) => {
    try {
      if (isMessagePlaying && playingAudio === uri) {
        setIsMessagePlaying(false);
        setPlayingAudio(null);
        await audioRecorderPlayer.stopPlayer();
      } else {
        if (isPreviewPlaying) {
          await audioRecorderPlayer.stopPlayer();
          setIsPreviewPlaying(false);
        }
        if (isMessagePlaying) {
          await audioRecorderPlayer.stopPlayer();
        }

        await audioRecorderPlayer.startPlayer(uri);
        setIsMessagePlaying(true);
        setPlayingAudio(uri);

        audioRecorderPlayer.addPlayBackListener(e => {
          if (e.currentPosition === e.duration) {
            audioRecorderPlayer.stopPlayer();
            setIsMessagePlaying(false);
            setPlayingAudio(null);
          }
        });
      }
    } catch (err) {
      console.log('playAudio error:', err);
    }
  };

  const resetAudioStates = () => {
    setShowPreview(false);
    setRecordedUri('');
    setRecordTime('0:00');
    setPlayTime('0:00');
    setIsPreviewPlaying(false);
  };

  return {
    playTime,
    isPreviewPlaying,
    isMessagePlaying,
    recordedUri,
    recordTime,
    showPreview,
    isRecording,
    playingAudio,
    onStartRecord,
    onStopRecord,
    onCancelRecord,
    onPlayPreview,
    onPlayAudio,
    setShowPreview,
    resetAudioStates,
  };
};
