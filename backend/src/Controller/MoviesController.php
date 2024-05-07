<?php

namespace App\Controller;

use App\Repository\MovieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;

class MoviesController extends AbstractController
{
    public function __construct(
        private MovieRepository $movieRepository,
        private SerializerInterface $serializer
    ) {}

    #[Route('/movies', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $genre = $request->query->get('genre');
        $rating = $request->query->get('rating');
        $sortBy = $request->query->get('sort');

        $queryBuilder = $this->movieRepository->createQueryBuilder('m');

        if ($genre || $rating) {
            $queryBuilder->join('m.movieGenres', 'mg');
        }
        
        if ($genre) {
            $queryBuilder->join('mg.genre', 'g', 'WITH', 'g.id = :genreId')
                ->setParameter('genreId', $genre);
        }
        
        if ($rating) {
            $queryBuilder->andWhere('m.rating = :rating')
                ->setParameter('rating', $rating);
        }
        

        if ($sortBy) {
            $orderBy = $sortBy === 'most_recent' ? 'DESC' : 'ASC';
            $queryBuilder->orderBy('m.releaseDate', $orderBy);
        }

        $movies = $queryBuilder->getQuery()->getResult();
        $data = $this->serializer->serialize($movies, 'json', ['groups' => 'default']);

        return new JsonResponse($data, json: true);
    }  
}
