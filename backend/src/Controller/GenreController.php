<?php

namespace App\Controller;

use App\Repository\GenreRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\SerializerInterface;


class GenreController extends AbstractController
{
    

    public function __construct(
        private GenreRepository $genreRepository,
        private SerializerInterface $serializer
        
    )
    {
        $this->genreRepository = $genreRepository;
    }

    #[Route('/genres', name: 'get_genres', methods: ['GET'])]
    public function getGenres(): JsonResponse
    {
        $genres = $this->genreRepository->findAll();
        $data = $this->serializer->serialize($genres, 'json', ['attributes' => ['id', 'name']]);

        return new JsonResponse($data, json: true);
    }
}