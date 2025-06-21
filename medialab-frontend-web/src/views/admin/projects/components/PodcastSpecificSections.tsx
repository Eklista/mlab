// src/views/admin/projects/components/PodcastSpecificSections.tsx
import { Mic, Volume2, Users, Radio, FileAudio, Clock } from 'lucide-react'
import { Card, Badge } from '@/core/components/ui'

interface Project {
  id: string
  title: string
  type: string
  episodes?: number
  duration?: string
  [key: string]: any
}

interface PodcastSpecificSectionsProps {
  project: Project
}

const PodcastSpecificSections = ({ project }: PodcastSpecificSectionsProps) => {
  // Mock data específico para podcasts
  const episodes = [
    {
      number: 1,
      title: 'Introducción a la Medicina Moderna',
      duration: '45:32',
      status: 'published',
      guest: 'Dr. Roberto Silva',
      recordDate: '2025-06-01'
    },
    {
      number: 2,
      title: 'Avances en Cardiología',
      duration: '52:15',
      status: 'in-production',
      guest: 'Dra. Ana Martínez',
      recordDate: '2025-06-08'
    },
    {
      number: 3,
      title: 'Futuro de la Telemedicina',
      duration: '38:20',
      status: 'scheduled',
      guest: 'Dr. Carlos López',
      recordDate: '2025-06-15'
    }
  ]

  const audioSpecs = {
    format: 'MP3',
    quality: '320 kbps',
    sampleRate: '48 kHz',
    channels: 'Stereo',
    duration: '45-60 min promedio'
  }

  const distribution = [
    { platform: 'Spotify', status: 'active', url: 'https://spotify.com/...' },
    { platform: 'Apple Podcasts', status: 'active', url: 'https://podcasts.apple.com/...' },
    { platform: 'Google Podcasts', status: 'pending', url: '' },
    { platform: 'YouTube', status: 'planned', url: '' }
  ]

  const getEpisodeStatusBadge = (status: string) => {
    const variants = {
      published: 'success',
      'in-production': 'warning',
      scheduled: 'info',
      draft: 'secondary'
    } as const

    const labels = {
      published: 'Publicado',
      'in-production': 'En Producción',
      scheduled: 'Programado',
      draft: 'Borrador'
    }

    return (
      <Badge variant={variants[status as keyof typeof variants]} size="sm">
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const getPlatformStatusBadge = (status: string) => {
    const variants = {
      active: 'success',
      pending: 'warning',
      planned: 'info',
      inactive: 'secondary'
    } as const

    const labels = {
      active: 'Activo',
      pending: 'Pendiente',
      planned: 'Planeado',
      inactive: 'Inactivo'
    }

    return (
      <Badge variant={variants[status as keyof typeof variants]} size="sm">
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Episodes List */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Radio className="w-5 h-5" />
          Episodios del Podcast
        </h3>
        <div className="space-y-4">
          {episodes.map((episode) => (
            <div key={episode.number} className="border border-zinc-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-white">
                    Episodio {episode.number}: {episode.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {episode.guest}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {episode.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mic className="w-3 h-3" />
                      {new Date(episode.recordDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                {getEpisodeStatusBadge(episode.status)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audio Specifications */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileAudio className="w-5 h-5" />
            Especificaciones de Audio
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-zinc-400">Formato</span>
              <Badge variant="secondary">{audioSpecs.format}</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-zinc-400">Calidad</span>
              <span className="text-zinc-300">{audioSpecs.quality}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-zinc-400">Sample Rate</span>
              <span className="text-zinc-300">{audioSpecs.sampleRate}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-zinc-400">Canales</span>
              <span className="text-zinc-300">{audioSpecs.channels}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
              <span className="text-zinc-400">Duración</span>
              <span className="text-zinc-300">{audioSpecs.duration}</span>
            </div>
          </div>
        </Card>

        {/* Distribution Platforms */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Plataformas de Distribución
          </h3>
          <div className="space-y-3">
            {distribution.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Radio className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-300">{platform.platform}</span>
                </div>
                {getPlatformStatusBadge(platform.status)}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recording Equipment */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Mic className="w-5 h-5" />
          Equipo de Grabación
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-zinc-800/30 rounded-lg">
            <h4 className="font-medium text-white mb-2">Micrófonos</h4>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li>• Rode PodMic (x2)</li>
              <li>• Audio-Technica AT2020</li>
              <li>• Shure SM7B</li>
            </ul>
          </div>
          <div className="p-4 bg-zinc-800/30 rounded-lg">
            <h4 className="font-medium text-white mb-2">Interface</h4>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li>• Focusrite Scarlett 4i4</li>
              <li>• Cables XLR</li>
              <li>• Audífonos Sony MDR-7506</li>
            </ul>
          </div>
          <div className="p-4 bg-zinc-800/30 rounded-lg">
            <h4 className="font-medium text-white mb-2">Software</h4>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li>• Adobe Audition</li>
              <li>• Hindenburg Pro</li>
              <li>• iZotope RX</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PodcastSpecificSections